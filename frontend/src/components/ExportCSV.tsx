import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormGroup, FormControlLabel, Checkbox, Button
} from '@mui/material';
import api from '../services/api';
import { saveAs } from 'file-saver';

const availableFields = ['id', 'date', 'amount', 'category', 'status', 'user_id'];

type Props = {
  open: boolean;
  onClose: () => void;
};

const ExportCSVModal = ({ open, onClose }: Props) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const handleToggle = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  const handleExport = async () => {
    try {
      const res = await api.get('/transactions/export', {
        params: { fields: selectedFields.join(',') },
        responseType: 'blob'
      });

      const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'transactions.csv');
      onClose();
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Fields to Export</DialogTitle>
      <DialogContent>
        <FormGroup>
          {availableFields.map((field) => (
            <FormControlLabel
              key={field}
              control={
                <Checkbox
                  checked={selectedFields.includes(field)}
                  onChange={() => handleToggle(field)}
                />
              }
              label={field}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleExport} disabled={selectedFields.length === 0} variant="contained">
          Export CSV
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportCSVModal;
